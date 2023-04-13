import CompletedTasks from "./worker_checked";
import CurrentTasks from "./worker_current";

export default function Worker_manage(props) {

    return (
        <>
            <CurrentTasks />
            <CompletedTasks />
        </>
    )
}