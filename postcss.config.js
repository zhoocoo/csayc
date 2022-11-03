export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "ie >= 11", // 兼容IE11以上浏览器
        "Firefox >= 3.5", // 兼容火狐版本号大于3.5浏览器
        "chrome  >= 35", // 兼容谷歌版本号大于35浏览器,
        "opera >= 11.5", // 兼容欧朋版本号大于11.5浏览器,
        "chrome  >= 36", // 如果需要适配的浏览器完全兼容则不会添加前缀
      ],
    },
    "postcss-pxtorem": {
      rootValue: 16, // Vant 官方根字体大小是 37.5
      propList: ["*"],
      selectorBlackList: [".norem"], // 过滤掉.norem-开头的class，不进行rem转换
    },
  },
  tailwindcss: {},
  autoprefixer: {},
};
