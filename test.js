const puppeteer = require("puppeteer");
var fs = require("fs");

let search_item = {
  search: "\\*4k",
  size: 4
};

const config = {
  searchContent: search_item.search,
  min_size: search_item.size, // GB
  day: 60, //距离当前日期多少天
  pageNum: 11 //翻页控件
};

function bt_size_filter(size, lim_size = 1) {
  lim_mb = lim_size * 1000;
  let str1 = size.match(/(\S*)GB/);
  let str2 = size.match(/(\S*)MB/);
  if (str1 && parseFloat(str1[1]) > lim_size) {
    return true;
  } else if (str2 && parseFloat(str2[1]) > lim_mb) {
    return true;
  } else {
    return false;
  }
}

function bt_date_filter(date, day = 30) {
  let time_now = new Date().getTime();
  var min_time = time_now - 1000 * 60 * 60 * 24 * day;
  let date_now = new Date().getDate() + day;
  let time_date = new Date(date).getTime();
  // console.log(`min_time: ${min_time}`);
  // console.log(`date_now: ${date_now}`);
  // console.log(`time_date: ${time_date}`);
  if (time_date > min_time) {
    return true;
  } else {
    return false;
  }
}

// page.evaluate(pageFunction, ...args)，可以向页面注入我们的函数

(async () => {
  // const browser = await puppeteer.launch({slowMo: 50, timeout: 30000});
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    timeout: 60000
  });
  const page = await browser.newPage();
  // let searchText = '00后';
  // let pageNum = 1;
  let searchText = config.searchContent;
  let pageNum = config.pageNum;
  // let url = 'https://btsow.pw/search/' + encodeURI(searchText)+ '/page/' + pageNum.toString();
  let url = "https://study.163.com/category/480000003121024";
  await page.goto(url, {
    timeout: 80000
  });

  async function getList() {
    let list_a = $(".uc-recommend-list .uc-recommend-course-list a.j-href img");

    // async function getHash(url) {
    //     hash = url.match(/hash\/(\S*)/);
    //     if (hash && hash[1]) {
    //         return hash[1];
    //     }
    // }
    let src_arr=[];

    if (list_a.length > 0) {
      for (let k = 0; k < list_a.length; k++) {
        let src = list_a[k];
        let href_text = src.src;
        src_arr.push(href_text);
      }
    }
    return {
      src_arr: src_arr,
    };
  }
  const magic = await page.evaluate(getList);
  // console.log('magic:', magic);
  await browser.close();

  console.log(`magic:${magic.src_arr}`);


  // magic.href.unshift('\n\n搜索内容：' + searchText + '\n' + '搜索页码：' + pageNum);
  // magic.href.push('\n');
  // let pageI = magic.href.join('\n');

  // final_url.unshift('\n');




})();
