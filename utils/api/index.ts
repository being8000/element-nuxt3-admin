import { Exports } from "./export";
import { Gets } from "./get";
import { Posts } from "./post";
import { Puts } from "./put";
import { Deletes } from "./delete";

export { Exports, Gets, Posts, Puts, Deletes };
export type ApiConstanst<T> = keyof T;
