import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import {HTMLDocument} from "./records.ts";
export async function archive_webpage(link:string):Promise<HTMLDocument> {
    return new Promise(async (resolve) =>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link);

        //Uint8 array
        let screenshot = await page.screenshot();
        //string
        // @ts-ignore
        const text = await page.evaluate(() => document.querySelector('*').outerHTML);

        let record = new HTMLDocument(link,screenshot,text);
        await browser.close();
        resolve(record)
    })
}

export async function archive_crawl(link:string,crawl_limit:number):Promise<Array<HTMLDocument>> {
    return new Promise(async (resolve) =>{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let return_array:Array<HTMLDocument> = [];
        let links_to_crawl = [link];

        for(let i = 0; i < links_to_crawl.length;i++){
            await page.goto(link);
            //Uint8 array
            let screenshot = await page.screenshot();
            //string
            // @ts-ignore
            const text = await page.evaluate(() => document.querySelector('*').outerHTML);
            let record = new HTMLDocument(link,screenshot,text);
            let domain_links = record.get_domain_links();
            for(let j =0; j < domain_links.length;j++){
                if(links_to_crawl.length < crawl_limit){
                    links_to_crawl.push(domain_links[j]);
                }
            }
            return_array.push(record)
        }


        await browser.close();
        resolve(return_array)
    })
}