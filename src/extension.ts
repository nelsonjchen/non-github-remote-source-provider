// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { RemoteSource, RemoteSourceProvider } from './typings/git';

interface RemoteRepositoryReference {
	// We don't care
	commit: string;
	// Reference string like "refs/heads/master"
	reference: string;
}

export class NonGitHubRemoteSourceProvider implements RemoteSourceProvider {
	readonly name = "Non GitHub";
	icon = "repo";
	supportsQuery = true;
	async getRemoteSources(query?: string): Promise<RemoteSource[]> {
		// There is no way to query all non-GitHub providers in the universe.
		// Well, not in any reasonable way.
		// Just return an empty array.
		return [];
	}
	async getBranches(url: string): Promise<string[]> {
		// Assume HEAD is the default branch
		return [];
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "non-github-remote-source-provider" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('non-github-remote-source-provider.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Non-GitHub Remote Source Provider!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
