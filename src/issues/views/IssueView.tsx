import {Link, Navigate, useParams} from "react-router-dom";
import {IssueComment} from "../components/IssueComment";
import {useIssue} from "../hooks";
import {Loading} from "../../shared/components/Loading";

export const IssueView = () => {
    //Hook de React router
    const params = useParams();
    const {id = "0"} = params;

    //El id es de tipo string y el useIssue espera un number, por eso
    //con el + delante del id lo convertimos en number
    const {issueQuery, commentsQuery} = useIssue(+id);

    if (issueQuery.isLoading) return <Loading />;

    if (!issueQuery.data) return <Navigate to={"./issues/lists"} />;

    return (
        <div className="row mb-5">
            <div className="col-12 mb-3">
                <Link to="./issues/list">Go Back</Link>
            </div>

            {/* Primer comentario */}
            <IssueComment issue={issueQuery.data} />

            {/* Comentario de otros */}
            {commentsQuery.isLoading && <Loading />}
            {/* <IssueComment body={comment2} />
            <IssueComment body={comment3} /> */}

            {commentsQuery.data?.map((issue) => (
                <IssueComment issue={issue} key={issue.id} />
            ))}
        </div>
    );
};
