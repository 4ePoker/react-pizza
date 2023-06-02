import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props: object) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={480}
        viewBox="0 0 280 480"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="140" cy="130" r="125" />
        <rect x="10" y="279" rx="5" ry="5" width="260" height="20" />
        <rect x="10" y="324" rx="13" ry="13" width="260" height="74" />
        <rect x="10" y="420" rx="12" ry="12" width="90" height="35" />
        <rect x="140" y="420" rx="25" ry="25" width="130" height="45" />
    </ContentLoader>
)

export default Skeleton

