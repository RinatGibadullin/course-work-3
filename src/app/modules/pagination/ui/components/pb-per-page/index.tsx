import React from "react";
import UDLink from "../../../../ud-ui/link/link";


type Props = {
    perPages: number[]
    activePerPage: number
    onChange: (perPage: number) => void
}
const PBPerPage = (props: Props) => {
    const { onChange, perPages, activePerPage } = props;
    // const hasNoActiveCount = !perPages.some((per) => Number(per) === Number(activePerPage));

    return (
        <div className="d-inline-flex align-items-center mr-7">
            <p className="regular-text fs14 mr-2 my-0">Показать:</p>
            {perPages.map(per =>
                <div key={per} className="mr-2 my-0">
                    <UDLink
                        href="#"
                        onClick={() => onChange(per)}
                        label={per.toString()}
                        active={Number(per) === Number(activePerPage)} />
                </div>
            )}
        </div>
    )
};

export default PBPerPage;
