module.exports = {
    base: '/vuepress/',
    title: '9240',
    description: 'Vuepress blog demo',
    themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          {
            text: 'Languages',
            items: [
              { text: 'Chinese', link: '/language/chinese/' },
              { text: 'Japanese', link: '/language/japanese/' }
            ]
          }
        ],
        sidebar: [
          ['/guide/', '指南'],
          ['/firstPage/', '简洁至上'],
          {
            title:"tab组",
            path:'/firstPage/',
            collapsable:false,
            sidebarDepth:3,
            children:[
              '/eighthPage/'
            ]
          },

          ['/secondPage/', 'Vue驱动'],
          ['/thirdPage/', '高性能'],
          ['/fourthPage/', '简洁至上1'],
          ['/fifthPage/', 'Vue驱动1'],
          ['/sixthPage/', '高性能1'],
          ['/seventhPage/', '简洁至上2'],
          ['/eighthPage/', 'Vue驱动2']
        ],
        displayAllHeaders: true,
        search: true,
        searchMaxSuggestions: 10
    },
    markdown: {
      lineNumbers: true
    }
}