const minimist = require('minimist')

module.exports = () => {
	const args = minimist(process.argv.slice(2))

	let cmd = args._[0];
	if(!cmd)
		cmd = 'help';
	if (args.help || args.h) {
		cmd = 'help'
	}

	switch (cmd) {
		case 'file_upload':
			require('./cmds/file_upload')(args)
			break

		case 'help':
			require('./cmds/help')(args)
			break

		default:
			console.error(`"${cmd}" is not a valid command!!`)
			break
	}
}
