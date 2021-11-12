# Non-GitHub Remote Source Provider

*Letting you choose a branch on a non-GitHub repository in the "Remote Containers: Clone Repository in Container Volume" command because not everyone uses GitHub!*

---

😭 **WARNING**: This does not currently work for "Remote Containers: Clone Repository in Container Volume".

This extension is left here as-is to show that the current behavior will need changes in the closed source extension of
"Remote: Containers" to actually properly support selected branches against non-GitHub repositories.

The extension is a simple extension that runs the equivalent of `git ls-remote` against an entered remote URL and presents
them as branches.

"Remote: Containers" appears to be hardcoded to only support branches when used with GitHub remotes.

When "Remote: Containers" clones a Git repository with branches, it does not strip the branch name from the remote URL
if the "Clone URL" is a non-GitHub URL when attempting to clone. This causes the clone to fail.

For example, when used with the repository of "https://gitlab.com/nelsonjchen/dev-container-test.git" which is on GitLab and the branch "`alt`":

```
[3300 ms] Start: Run in container: git clone --depth 1 https://gitlab.com/nelsonjchen/dev-container-test.git/tree/alt .
Cloning into '.'...
warning: templates not found in /root/.git_template
fatal: unable to access 'https://gitlab.com/nelsonjchen/dev-container-test.git/tree/alt/': The requested URL returned error: 503
[3947 ms] Start: Run: docker rm -f 15ebebc8673a8b25b65e3859f6db76e5be9940da6fe2051fbcdd04cb1b568eba
[4145 ms] Remote-Containers server terminated (code: 137, signal: null).
```

"https://gitlab.com/nelsonjchen/dev-container-test.git/tree/alt/" is not a valid Git repository URL.

For contrast, when *this* extension is used against "https://github.com/nelsonjchen/dev-container-test.git" which is on GitHub and the branch "`alt`",
it doesn't attempt to clone with the branch name embedded in the URL. It somehow clones the repository without the branch name and then proceeds without
error on the `alt` branch. There isn't a similar message in the output for this happy path similar to the one above. "Remote: Containers" is closed source so it is a bit  opaque.

There are other minor cosmetic issues too. The Git Extension repository picker is not very extensible and assumes all source providers are GitHub-like. There is no way to configure the prompt after selecting this source provider and prompt to enter in a repository URL as a prompt. A hack must be done where the query is itself used to generate the results. This is minor compared to the above.

---

For addressing https://github.com/microsoft/vscode-remote-release/issues/4296.

That's all it does. It's no GitLens or any other major VS Code extension.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

This extension needs to run in an environment that has `git` available on the path.

## Extension Settings

There are no extension settings.

## Known Issues

There are no current known issues. It's very broken.

## Release Notes

Users appreciate release notes as you update your extension.

### 2021.12.1

Initial release of this tool
