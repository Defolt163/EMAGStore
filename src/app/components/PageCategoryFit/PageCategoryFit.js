
import Link from "next/link";
import './PageCategoryFit.sass'


export default function PageCategoryFitCard(props) {
    return(
        <Link href='/' style={{backgroundImage: `url(${props.bgimage})`}} className="PageCategoryFitCard">
            <div className="CategoryFitCardDescr">
                <div className="CategoryFitCardHeader">{props.fit_header}</div>
                <div className="CategoryFitCardSubHeader">Коллекция →</div>
            </div>
        </Link>
    )
}