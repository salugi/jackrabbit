import {archive_crawl, archive_webpage} from "./modules/archiver.ts";

let archived_pages = await archive_crawl("https://www.iana.org/domains/example",10);
console.log(archived_pages.length);


export {};

