import { load, Element, Cheerio } from "cheerio";
import { ProblemStatement } from "./types";

export async function getCurrentData() {
  const data = await fetch("https://www.sih.gov.in/sih2023PS");

  const $ = load(await data.text());

  const problem_statements: ProblemStatement[] = [];

  $("[id^='ViewProblemStatement']").each((i, el) => {
    problem_statements.push(getPSData($(el)));
  });

  return problem_statements;
}

function getPSData($el: Cheerio<Element>) {
  let id = parseInt($el.attr("id")!.split("ViewProblemStatement")[1]);

  const parent = $el.parent();
  const superParent = parent.parent();

  let ps_code: string = superParent.find("td:nth-child(5)").text().trim();

  const title = parent.find("a").text().trim().replace(/\s\s+/g, " ");

  const description = $el
    .find('.modal-body table th:contains("Description")')
    .next()
    .text()
    .trim()
    .replace(/\s\s+/g, " ");
  const org = $el
    .find('table th:contains("Organization")')
    .next()
    .text()
    .trim()
    .replace(/\s\s+/g, " ");

  const category = $el
    .find('table th:contains("Category")')
    .next()
    .text()
    .trim()
    .replace(/\s\s+/g, " ");

  const domain = $el
    .find('table th:contains("Domain Bucket")')
    .next()
    .text()
    .trim()
    .replace(/\s\s+/g, " ");

  let youtube = $el
    .find('table th:contains("Youtube Link")')
    .next()
    .find("a")
    .attr("href")
    ?.trim();

  if (youtube === "") {
    youtube = undefined;
  }

  let dataset: string | undefined = $el
    .find('table th:contains("Dataset Link")')
    .next()
    .text()
    .trim();

  if (dataset === "NA") {
    dataset = undefined;
  }

  let submissions = 0;
  try {
    let el = superParent.find("td:nth-child(6)").text().trim();
    submissions = parseInt(el!); // not available in modal
  } catch (error) {
    console.log("Error in submissions", error);
  }

  const data = {
    id,
    ps_code,
    title,
    description,
    org,
    category,
    domain,
    youtube,
    dataset,
    submissions,
  } as ProblemStatement;
  return data;
}
