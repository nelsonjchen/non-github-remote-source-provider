import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('simple provider test', async () => {
		let provider = new myExtension.NonGitHubRemoteSourceProvider();
		// Test against a GitLab
		let branches = await provider.getBranches("https://gitlab.com/nelsonjchen/dev-container-test");
		assert.ok(branches.length > 2);
	});
});
