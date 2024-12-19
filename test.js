module.exports = {
  apps : [{
    name: "next-app",
    script: "npm",
    args: "run dev",
    cwd: "/home/azureuser/ChowchowExpress-NextJs",
    watch: true,
    env: {
      NODE_ENV: "production",
    }
  }]
};

