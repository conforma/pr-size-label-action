const core = require('@actions/core');
const github = require('@actions/github');

/**
 * Determines the size label based on total lines changed
 * @param {number} size - Total lines changed (additions + deletions)
 * @returns {string} Size label (XS, S, M, L, XL, or XXL)
 */
function getSizeLabel(size) {
  if (size > 600) {
    return 'XXL';
  } else if (size > 240) {
    return 'XL';
  } else if (size > 120) {
    return 'L';
  } else if (size > 60) {
    return 'M';
  } else if (size > 35) {
    return 'S';
  }
  return 'XS';
}

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    
    const { owner, repo } = github.context.repo;

    if (!github.context.payload.pull_request) {
      core.setFailed('This action must be run on pull_request or pull_request_target events.');
      return;
    }

    const prNumber = github.context.payload.pull_request.number;
    
    console.log(`Processing PR #${prNumber} in ${owner}/${repo}`);
    
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber
    });
    
    const additions = pr.additions;
    const deletions = pr.deletions;
    const size = additions + deletions;
    
    console.log(`PR size: ${additions} additions + ${deletions} deletions = ${size} total changes`);
    
    const sizeLabel = getSizeLabel(size);
    
    console.log(`Determined size label: ${sizeLabel}`);
    
    const { data: currentLabels } = await octokit.rest.issues.listLabelsOnIssue({
      owner,
      repo,
      issue_number: prNumber
    });
    
    const newLabel = `size: ${sizeLabel}`;
    
    const hasCorrectLabel = currentLabels.some(label => label.name === newLabel);
    
    if (hasCorrectLabel) {
      console.log(`PR already has the correct label: ${newLabel}. No changes needed.`);
      return;
    }
    
    const sizeLabels = currentLabels.filter(label => label.name.startsWith('size:'));
    console.log(`Found ${sizeLabels.length} existing size labels to remove`);
    
    for (const label of sizeLabels) {
      console.log(`Removing label: ${label.name}`);
      await octokit.rest.issues.removeLabel({
        owner,
        repo,
        issue_number: prNumber,
        name: label.name
      });
    }
    
    console.log(`Adding label: ${newLabel}`);
    
    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: prNumber,
      labels: [newLabel]
    });
    
    console.log(`Successfully labeled PR #${prNumber} with ${newLabel}`);
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = { getSizeLabel, run };
