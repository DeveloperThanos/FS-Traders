// content.ts - FULL CLEAN OPTIMIZED FOR CRUD
export const productContents = {
  headings: {
    en: { heading: "Our Product", subheadingImport: "Import Product", subheadingExport: "Export Product" },
    zh: { heading: "我们的产品", subheadingImport: "进口产品", subheadingExport: "出口产品" },
    si: { heading: "අපගේ නිෂ්පාදන", subheadingImport: "ආනයන නිෂ්පාදන", subheadingExport: "අපනයන නිෂ්පාදන" }
  },

  import: {
    vegetables: {
      en: { category: "Vegetables & Roots", assetName: "Vegetables" },
      zh: { category: "蔬菜与根茎", assetName: "Vegetables" },
      si: { category: "එළවළු සහ වර්ග මුල්", assetName: "Vegetables" },
      items: [
        { 
          imagePath: "/assets/products/Import/Vegetables/big-onion.png", 
          en: { imageName: "Big Onion", origins: ["China", "India", "Pakistan", "Egypt", "Netherlands", "Spain"] },
          zh: { imageName: "大洋葱", origins: ["中国", "印度", "巴基斯坦", "埃及", "荷兰", "西班牙"] },
          si: { imageName: "විශාල ලූනු", origins: ["චීන", "ඉන්දියාව", "පාකිස්තානය", "ඊජිප්තු", "නෙදර්ලන්තය", "ස්පාඤ්ඤය"] }
        },
        { 
          imagePath: "/assets/products/Import/Vegetables/potato.jpg", 
          en: { imageName: "Potato", origins: ["India", "Bangladesh", "Pakistan", "China", "Holland"] },
          zh: { imageName: "土豆", origins: ["印度", "孟加拉国", "巴基斯坦", "中国", "荷兰"] },
          si: { imageName: "අල", origins: ["ඉන්දියාව", "බංගලාදේශය", "පාකිස්තානය", "චීන", "හොලන්තය"] }
        },
        { 
          imagePath: "/assets/products/Import/Vegetables/red-onion.jpg", 
          en: { imageName: "Red Onion", origins: ["Thailand", "China", "India"] },
          zh: { imageName: "红洋葱", origins: ["泰国", "中国", "印度"] },
          si: { imageName: "රතු ලූනු", origins: ["තායිලන්තය", "චීන", "ඉන්දියාව"] }
        },
        { 
          imagePath: "/assets/products/Import/Vegetables/garlic.jpg", 
          en: { imageName: "Garlic", origins: ["China", "Pakistan", "Iran", "India"] },
          zh: { imageName: "大蒜", origins: ["中国", "巴基斯坦", "伊朗", "印度"] },
          si: { imageName: "සුදුලූණු", origins: ["චීන", "පාකිස්තානය", "ඉරානය", "ඉන්දියාව"] }
        }
      ]
    },

    grains: {
      en: { category: "Grains, Pulses & Lentils", assetName: "Grains" },
      zh: { category: "谷物、豆类与扁豆", assetName: "Grains" },
      si: { category: "ධාන්‍ය, පළිබීජ සහ පලාන්තු", assetName: "Grains" },
      items: [
        { 
          imagePath: "/assets/products/Import/Grains/red-split-lentils.jpg", 
          en: { imageName: "Red Split Lentils", origins: ["Australia", "Canada"] },
          zh: { imageName: "红扁豆", origins: ["澳大利亚", "加拿大"] },
          si: { imageName: "රතු බිඳුණු පලාන්තු", origins: ["ඕස්ට්‍රේලියාව", "කැනඩාව"] }
        },
        { 
          imagePath: "/assets/products/Import/Grains/yellow-split-lentils.jpg", 
          en: { imageName: "Yellow Split Lentils", origins: ["Australia", "Turkey"] },
          zh: { imageName: "黄扁豆", origins: ["澳大利亚", "土耳其"] },
          si: { imageName: "කහ බිඳුණු පලාන්තු", origins: ["ඕස්ට්‍රේලියාව", "ටර්කි"] }
        },
        { 
          imagePath: "/assets/products/Import/Grains/green-mung.jpg", 
          en: { imageName: "Green Mung", origins: ["Various origins"] },
          zh: { imageName: "绿豆", origins: ["多种来源"] },
          si: { imageName: "කොළ මුං", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Import/Grains/urud-dhal.jpg", 
          en: { imageName: "Urud Dhal", origins: ["Various origins"] },
          zh: { imageName: "乌豆", origins: ["多种来源"] },
          si: { imageName: "උරුද් පලාන්තු", origins: ["විවිධ මූලාශ්‍ර"] }
        }
      ]
    },

    spicesSeeds: {
      en: { category: "Spices & Seeds", assetName: "Spices Seeds" },
      zh: { category: "香料与种子", assetName: "Spices Seeds" },
      si: { category: "මසාලා සහ බීජ", assetName: "Spices Seeds" },
      items: [
        { 
          imagePath: "/assets/products/Import/Spices/coriander-seeds.jpg", 
          en: { imageName: "Coriander Seeds", origins: ["India", "Argentina", "Canada", "Bulgaria", "Romania", "Ukraine", "Russia"] },
          zh: { imageName: "芫荽种子", origins: ["印度", "阿根廷", "加拿大", "保加利亚", "罗马尼亚", "乌克兰", "俄罗斯"] },
          si: { imageName: "ධානු බීජ", origins: ["ඉන්දියාව", "ඇජන්ටිනා", "කැනඩාව", "බල්ගේරියාව", "රොමේනියාව", "යුක්රේනය", "රුසියාව"] }
        },
        { 
          imagePath: "/assets/products/Import/Spices/cumin-seeds.jpg", 
          en: { imageName: "Cumin Seeds", origins: ["Various origins"] },
          zh: { imageName: "孜然", origins: ["多种来源"] },
          si: { imageName: "කුමුන් බීජ", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Import/Spices/fennel-seeds.jpg", 
          en: { imageName: "Fennel Seeds", origins: ["Various origins"] },
          zh: { imageName: "茴香", origins: ["多种来源"] },
          si: { imageName: "සාදු බීජ", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Import/Spices/mustard-seeds.jpg", 
          en: { imageName: "Mustard Seeds", origins: ["Various origins"] },
          zh: { imageName: "芥菜籽", origins: ["多种来源"] },
          si: { imageName: "අලිගැටලු බීජ", origins: ["විවිධ මූලාශ්‍ර"] }
        }
      ]
    },

    otherFood: {
      en: { category: "Other Food Products", assetName: "Other Food" },
      zh: { category: "其他食品", assetName: "Other Food" },
      si: { category: "වෙනත් ආහාර නිෂ්පාදන", assetName: "Other Food" },
      items: [
        { 
          imagePath: "/assets/products/Import/Other Food/sugar.jpg", 
          en: { imageName: "Sugar", origins: ["India", "Brazil", "Thailand", "Europe"] },
          zh: { imageName: "糖", origins: ["印度", "巴西", "泰国", "欧洲"] },
          si: { imageName: "සීනි", origins: ["ඉන්දියාව", "බ්‍රසීලය", "තායිලන්තය", "යුරෝපය"] }
        },
        { 
          imagePath: "/assets/products/Import/Other Food/dry-sprats.jpg", 
          en: { imageName: "Dry Sprats (Fish)", origins: ["Thailand", "Iran"] },
          zh: { imageName: "干小鱼", origins: ["泰国", "伊朗"] },
          si: { imageName: "ආහාර දියර මැස්සා", origins: ["තායිලන්තය", "ඉරානය"] }
        },
        { 
          imagePath: "/assets/products/Import/Other Food/canned-fish.jpg", 
          en: { imageName: "Canned Fish", origins: ["Various origins"] },
          zh: { imageName: "罐装鱼", origins: ["多种来源"] },
          si: { imageName: "කෑන් මසුන්", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Import/Other Food/dry-chilli.jpg", 
          en: { imageName: "Dry Chilli", origins: ["Various origins"] },
          zh: { imageName: "干辣椒", origins: ["多种来源"] },
          si: { imageName: "වියළි මිරිස්", origins: ["විවිධ මූලාශ්‍ර"] }
        }
      ]
    },

    foodAdditives: {
      en: { category: "Food Additives & Chemicals and Miscellaneous", assetName: "Food Additives" },
      zh: { category: "食品添加剂及化学品和杂项", assetName: "Food Additives" },
      si: { category: "ආහාර ඇඩ්ඩිටිව්ස්, රසායනික සහ විවිධ", assetName: "Food Additives" },
      items: [
        { 
          imagePath: "/assets/products/Import/Additives/sodium-bicarbonate.jpg", 
          en: { imageName: "Sodium Bicarbonate", origins: ["Various origins"] },
          zh: { imageName: "碳酸氢钠", origins: ["多种来源"] },
          si: { imageName: "සෝඩියම් බයිකාබෝනේට්", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Import/Additives/ammonium-bicarbonate.jpg", 
          en: { imageName: "Ammonium Bicarbonate", origins: ["Various origins"] },
          zh: { imageName: "碳酸氢铵", origins: ["多种来源"] },
          si: { imageName: "ඇමෝනියම් බයිකාබෝනේට්", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Import/Additives/citric-acid.jpg", 
          en: { imageName: "Citric Acid", origins: ["Various origins"] },
          zh: { imageName: "柠檬酸", origins: ["多种来源"] },
          si: { imageName: "ලෙමන් අම්ලය", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Import/Additives/used-newspaper.jpg", 
          en: { imageName: "Used Newspaper", origins: ["Various origins"] },
          zh: { imageName: "废旧报纸", origins: ["多种来源"] },
          si: { imageName: "පැරණි පත්තර", origins: ["විවිධ මූලාශ්‍ර"] }
        }
      ]
    }
  },

  export: {
    spices: {
      en: { category: "Spices", assetName: "Spices" },
      zh: { category: "香料", assetName: "Spices" },
      si: { category: "මසාලා", assetName: "Spices" },
      items: [
        { 
          imagePath: "/assets/products/Export/Spices/black-pepper.jpg", 
          en: { imageName: "Black Pepper", origins: ["Various origins"] },
          zh: { imageName: "黑胡椒", origins: ["多种来源"] },
          si: { imageName: "කළු ගම්මිරිස්", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Export/Spices/cinnamon.jpg", 
          en: { imageName: "Cinnamon", origins: ["Various origins"] },
          zh: { imageName: "肉桂", origins: ["多种来源"] },
          si: { imageName: "දරුකුරුඳු", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Export/Spices/cumin-seeds.jpg", 
          en: { imageName: "Cumin Seeds", origins: ["Various origins"] },
          zh: { imageName: "孜然", origins: ["多种来源"] },
          si: { imageName: "කුමුන් බීජ", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Export/Spices/fenugreek-seeds.jpg", 
          en: { imageName: "Fenugreek Seeds", origins: ["Various origins"] },
          zh: { imageName: "葫芦巴种子", origins: ["多种来源"] },
          si: { imageName: "මොලු බීජ", origins: ["විවිධ මූලාශ්‍ර"] }
        }
      ]
    },

    agriculture: {
      en: { category: "Agricultural & Plantation Products", assetName: "Agriculture" },
      zh: { category: "农业及种植产品", assetName: "Agriculture" },
      si: { category: "කෘෂිකාර්මික සහ වගා නිෂ්පාදන", assetName: "Agriculture" },
      items: [
        { 
          imagePath: "/assets/products/Export/Agriculture/king-coconut.jpg", 
          en: { imageName: "King Coconut", origins: ["Various origins"] },
          zh: { imageName: "国王椰子", origins: ["多种来源"] },
          si: { imageName: "කින්ග් නාරික්ක", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Export/Agriculture/coconut.jpg", 
          en: { imageName: "Coconut", origins: ["Various origins"] },
          zh: { imageName: "椰子", origins: ["多种来源"] },
          si: { imageName: "නාරික්ක", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Export/Agriculture/papaya.jpg", 
          en: { imageName: "Papaya", origins: ["Various origins"] },
          zh: { imageName: "木瓜", origins: ["多种来源"] },
          si: { imageName: "පපොයි", origins: ["විවිධ මූලාශ්‍ර"] }
        },
        { 
          imagePath: "/assets/products/Export/Agriculture/tapioca.jpg", 
          en: { imageName: "Tapioca", origins: ["Various origins"] },
          zh: { imageName: "木薯", origins: ["多种来源"] },
          si: { imageName: "තප්පියොක", origins: ["විවිධ මූලාශ්‍ර"] }
        }
      ]
    },

    pulsesGrains: {
      en: { category: "Pulses & Grains", assetName: "Pulses Grains" },
      zh: { category: "豆类与谷物", assetName: "Pulses Grains" },
      si: { category: "පලාන්තු සහ ධාන්‍ය", assetName: "Pulses Grains" },
      items: [
        { 
          imagePath: "/assets/products/Export/Grains/chickpeas.jpg", 
          en: { imageName: "Chickpeas", origins: ["Various origins"] },
          zh: { imageName: "鹰嘴豆", origins: ["多种来源"] },
          si: { imageName: "චික්පීස්", origins: ["විවිධ මූලාශ්‍ර"] }
        }
      ]
    }
  }
} as const;
