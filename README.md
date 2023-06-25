# ts-git-hooks

Easy setup of Git hooks in any TypeScript project with automatic hook management.

## Features

- Easy setup of Git hooks in any TypeScript project.
- Automatic hook management.
- Customizable hooks for specific Git actions (commit, push, etc.).

## Installation

Install `ts-git-hooks` as a development dependency in your project:

```bash
npm install --save-dev ts-git-hooks
```

## Usage
After installing `ts-git-hooks`, you can set up your Git hooks in your package.json file's scripts section:

```json
{
  "scripts": {
    "precommit": "ts-git-hooks precommit",
    "prepush": "ts-git-hooks prepush"
  }
}
```

Then, define the hook scripts in your TypeScript project. For instance, you might have a `precommit.ts` script that runs tests before each commit.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License 
MIT 
