module.exports = {
  apps: [
    {
      name: "kt-seo",
      exec_mode: "cluster",
      instances: "4",
      script: "./.output/server/index.mjs",
      max_memory_restart: "400M",
      env: {
        PORT: 8889,
        HOST: "0.0.0.0",
      },
      env_test: {
        PORT: 8889,
        HOST: "0.0.0.0",
      },
      env_beta: {
        PORT: 8889,
        HOST: "0.0.0.0",
      },
      ignore_watch: ["node_modules", "test"],
      merge_logs: true,
      restart_delay: 2000,
    },
  ],
};