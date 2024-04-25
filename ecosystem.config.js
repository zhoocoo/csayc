module.exports = {
  apps: [
    {
      name: "blog",
      exec_mode: "cluster",
      instances: "1",
      script: "./.output/server/index.mjs",
      max_memory_restart: "400M",
      env: {
        PORT: 3000,
      },
      ignore_watch: ["node_modules", "test"],
      merge_logs: true,
      restart_delay: 2000,
    },
  ],
};
