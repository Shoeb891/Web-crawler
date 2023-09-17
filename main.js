const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main(){
    if(process.argv.length < 3){
        console.log("No Website provided");
    }
    else if(process.argv.length > 3){
        console.log("Too many arguments provided");
    }

    const baseURL = process.argv[2];
    console.log(`Starting crawl of ${baseURL}...`)

    const pages = await crawlPage(baseURL, baseURL, {});

    printReport(pages);
}

main()