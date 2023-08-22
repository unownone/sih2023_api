export interface ProblemStatement {
  /**
   * Problem Statement Number
   * eg:SIH1248
   */
  id: number;
  ps_code: string;
  /**
   * Problem Statement Title
   *eg: Development of software for streamlining the listing of cases through Differentiated Case Flow Management
   */
  title: string;
  /**
   * Problem Description
   * eg: Cases differ substantially in the time required for a fair and timely adjudication, not all cases make the same demands upon judicial system resources. Thus, they ... [truncated]
   */
  description: string;
  /**
   * Organisation.
   * eg:Ministry of Law and Justice
   */
  org: string;
  /**
   * Category of the problem statement
   */
  category: "SOFTWARE" | "HARDWARE";
  /**
   * Domain Bucket:
   * eg:Miscellaneous
   */
  domain: string;
  /**
   * Attached Youtube Link HREF
   * (if any)
   * eg: <a href="https://youtube.com/?v=sdaas" target="_blank">Video</a>
   * if no video ie:  <a href=" " target="_blank"> </a> then undefined
   */
  youtube?: string;
  /**
   * Link to dataset (if any)
   * eg: NA then undefined
   * else : abc.xyz/efg
   */
  dataset?: string;
  /**
     * Nunmber of submissions
     * eg: 0
     *
              <td>Software </td>
              <td>SIH1279</td>
              <td>0</td>
              <td>Miscellaneous</td>
              from here
     */
  submissions: number;
}

export interface Env {
  TELEGRAM_BOT_TOKEN: string;
}
