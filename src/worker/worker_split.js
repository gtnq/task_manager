import CompletedTasks from "./worker_checked";
import CurrentTasks from "./worker_current";

export default function WorkerManage(props) {

    return (
        <>
            <CurrentTasks />
            <CompletedTasks />
        </>
    )
}