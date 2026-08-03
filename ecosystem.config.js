// PM2 config: pm2 start ecosystem.config.js

module.exports = {
	apps: [
		{
			name: 'mwc-website',
			script: 'server.js',
			cwd: __dirname,

			exec_mode: 'fork',
			instances: 1,

			env: {
				NODE_ENV: 'production',
				PORT: 3005,
			},

			watch: false,
			ignore_watch: ['logs', 'node_modules', '.git', 'public'],

			autorestart: true,
			max_restarts: 10,
			restart_delay: 2000,
			min_uptime: '10s',

			max_memory_restart: '200M',

			error_file: 'logs/error.log',
			out_file: 'logs/out.log',
			merge_logs: true,
			time: true,
		},
	],
};
