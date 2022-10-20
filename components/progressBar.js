const ProgressBar = (props) => {
    const { bgcolor, completed, labelName } = props;

    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        // <div style={containerStyles}>
        //     <div style={fillerStyles}>
        //         <span style={labelStyles}>{labelName} {`${completed}%`}</span>
        //     </div>
        // </div>
        <div>
            <div className="mb-1 text-sm font-medium">{labelName}</div>
            <div className="mb-4 w-full h-4 bg-gray-200 rounded-full">
                <div className="h-4 rounded-full" style={fillerStyles}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
