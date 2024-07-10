import '../styling/nav.css';

export default function Nav(){

    type Option = {
        key: string;
        value: string;
    };

    const Options : Option[] = [
        {key: "Home",value: "/"},
        {key: "Contact", value: "contact"},
        {key: "About", value: "about"}
    ];

    const GenerateOptions = ({options} : {options : Option[]}) => {
        return (
            <ul>
            {options.map((item,index) => (
                <li key={index}>
                    <p>{item.key}</p>
                </li>
            ))}
            </ul>
        )
    };

    return(
        <nav>
            <div className="navigationNameContainer">
                <p>Tom Senior</p>
            </div>
            <div className="navigationListContainer">
                <GenerateOptions options={Options}/>
            </div>
        </nav>    
    )
};