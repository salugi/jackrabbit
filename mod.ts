import {archive_crawl, archive_webpage, curated_crawl} from "./modules/archiver.ts";

//let archived_pages = await archive_crawl("https://www.iana.org/domains/example",10);
//console.log(archived_pages.length);
let curated = await curated_crawl("https://www.iana.org/domains/example",10, "/domains/example")
console.log(curated)
export {};

