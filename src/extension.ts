// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import simpleGit from 'simple-git';
import * as vscode from 'vscode';
import { extensions } from 'vscode';
import { GitExtension } from './typings/git';
import { RemoteSource, RemoteSourceProvider } from './typings/git';
import { combinedDisposable, dispose } from './util';

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
		// Use the query as the
		if (query) {
			return [
				{
					name: query,
					description: "",
					url: query,
				}
			];
		}

		return [
			{
				name: "Enter the repository URL above.",
				url: ""
			}
		];
	}
	async getBranches(url: string): Promise<string[]> {
		let git = simpleGit();
		let branches: string[];
		try {
			let result = await git.raw(['ls-remote', url]);
			let commitReferences = result
				.split('\n')
				.filter(line => line.length !== 0)
				.map(line => {
					let [commit, reference] = line.split('\t');
					return { commit, reference };
				});
			let branchCommitReferences = commitReferences.filter(
				ref => ref.reference.startsWith('refs/heads/')
			);
			branches = branchCommitReferences.map(ref => ref.reference.substr(11));
		} catch (error) {
			console.info("error on retrieval, returning empty branch array");
			console.warn(error);
			return [];
		}

		return branches;
	}
}

// Pretty much borrowed from GitHub's extension.
// Enablement of GitHub's extension is bound to Git's own enablement.
export function activate(context: vscode.ExtensionContext) {
	const disposables = new Set<vscode.Disposable>();
	context.subscriptions.push(combinedDisposable(disposables));

	const init = () => {
		try {
			const gitAPI = gitExtension.getAPI(1);

			disposables.add(gitAPI.registerRemoteSourceProvider(new NonGitHubRemoteSourceProvider()));
		} catch (err) {
			console.error('Could not initialize Non-GitHub Remote Source Provider extension');
			console.warn(err);
		}
	};

	const onDidChangeGitExtensionEnablement = (enabled: boolean) => {
		if (!enabled) {
			dispose(disposables);
			disposables.clear();
		} else {
			init();
		}
	};


	const gitExtension = extensions.getExtension<GitExtension>('vscode.git')!.exports;
	context.subscriptions.push(gitExtension.onDidChangeEnablement(onDidChangeGitExtensionEnablement));
	onDidChangeGitExtensionEnablement(gitExtension.enabled);
}

// this method is called when your extension is deactivated
export function deactivate() { }
