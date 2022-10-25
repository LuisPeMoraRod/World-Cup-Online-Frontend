import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MatchInputs.scss";
import Select from "react-select";
import "react-bootstrap-typeahead/css/Typeahead.css";
import React, {useState} from "react";
import TimePicker from "react-time-picker";

/**
 * input text required to enter a match location  
 * @param {*} props 
 * @returns 
 */
const MatchInputText = (props) => {

    /**
     * focused object 
     * */
    const [focused, setFocused] = useState(false);
    /**
     * Is in charge to set the focused state in true. 
     * It works if any user touch a field and dont type or select anything
     * @param {*} e 
     */
    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="formInput">
            <input 
            required
            name={props.name}
            placeholder={props.placeholder}
            onChange={(e) => {
                props.updateMatch({location: e });
            }}
            onBlur = {handleFocus} focused={focused.toString()}/>
            <p></p>
            <span className="error">{props.errorMessage}</span>
        </div>
    )
}

/**
 * input select required to choose a match phase  
 * @param {*} props 
 * @returns 
 */
const MatchInputSelectPhase = (props) => {

    /**
     * Object required to set the style of the <span>.
     * @param {*} style 
     * @returns 
     */
    const initStyle = (style) => {
        const mystyle = {
            size: "15px",
            padding: "3px",
            color: "red",
            display: "none",
        };
        return !!style ? style : mystyle;
    };

    /**
     * Object style
     */
    const [style, setStyle] = useState(initStyle);

    /**
   * Updates style object. Updates fields and values passed as object
   * @param {Object} updatedFields
   */
    const updateStyle = (updatedFields) => {
        setStyle({ ...style, ...updatedFields });
    };
    /**
     * focused object 
     * */
    const [focused, setFocused] = useState(false);
    /**
     * Is in charge to set the focused state in true. 
     * It works if any user touch a field and dont type or select anything
     * @param {*} e 
     */
    const handleFocus = (e) => {
        setFocused(true);
        if(props.match.phase == ''){
            updateStyle({display: "block"});
        }
    };
    
    return (
        <div className="formInput">
            <Select
            required
            name={props.name}
            options={props.options} 
            placeholder={props.placeholder}
            onChange={(e) => {
                props.updateMatch({phase: e.id });
                updateStyle({display: "none"})
            }}
            onBlur = {handleFocus} focused={focused.toString()}
            />
            <p></p>
            <span style={style} className="errorSelect">{props.errorMessage}</span>
        </div>
    )
}
/**
 * input select required to choose a match team
 * @param {*} props 
 * @returns 
 */
const MatchInputSelectTeamA = (props) => {
    /**
     * Object required to set the style of the <span>.
     * @param {*} style 
     * @returns 
     */
    const initStyle = (style) => {
        const mystyle = {
            size: "15px",
            padding: "3px",
            color: "red",
            display: "none",
        };
        return !!style ? style : mystyle;
    };

    /**
     * Object style
     */
    const [style, setStyle] = useState(initStyle);

    /**
   * Updates style object. Updates fields and values passed as object
   * @param {Object} updatedFields
   */
    const updateStyle = (updatedFields) => {
        setStyle({ ...style, ...updatedFields });
    };
    /**
     * focused object 
     * */
    const [focused, setFocused] = useState(false);
    /**
     * Is in charge to set the focused state in true. 
     * It works if any user touch a field and dont type or select anything
     * @param {*} e 
     */
    const handleFocus = (e) => {
        setFocused(true);
        if(props.match.teama == ''){
            updateStyle({display: "block"});
        }
    };
    return (
        <div className="formInput">
            <Select
            required
            options={props.options} 
            placeholder={props.placeholder}
            onChange={(e) => {
                props.updateMatch({teama: e.id});
                updateStyle({display: "none"})
            }}
            onBlur = {handleFocus} focused={focused.toString()}/>
            <p></p>
            <span style={style} className="error">{props.errorMessage}</span>
        </div>
    )
}

/**
 * input select required to choose a match team
 * @param {*} props 
 * @returns 
 */
const MatchInputSelectTeamB= (props) => {
    /**
     * Object required to set the style of the <span>.
     * @param {*} style 
     * @returns 
     */
    const initStyle = (style) => {
        const mystyle = {
            size: "15px",
            padding: "3px",
            color: "red",
            display: "none",
        };
        return !!style ? style : mystyle;
    };

    /**
     * Object style
     */
    const [style, setStyle] = useState(initStyle);

    /**
   * Updates style object. Updates fields and values passed as object
   * @param {Object} updatedFields
   */
    const updateStyle = (updatedFields) => {
        setStyle({ ...style, ...updatedFields });
    };
    /**
     * focused object 
     * */
    const [focused, setFocused] = useState(false);
    /**
     * Is in charge to set the focused state in true. 
     * It works if any user touch a field and dont type or select anything
     * @param {*} e 
     */
    const handleFocus = (e) => {
        setFocused(true);
        if(props.match.teamb == ''){
            updateStyle({display: "block"});
        }
    };
    return (
        <div className="formInput">
            <Select
            required
            options={props.options} 
            placeholder={props.placeholder}
            onChange={(e) => {
                props.updateMatch({teamb: e.id});
                updateStyle({display: "none"})
            }}
            onBlur = {handleFocus} focused={focused.toString()}/>
            <p></p>
            <span style={style} className="error">{props.errorMessage}</span>
        </div>
    )
}

/**
 * input select time required to choose a match time
 * @param {*} props 
 * @returns 
 */
const MatchInputTime = (props) => {
    /**
     * Object required to set the style of the <span>.
     * @param {*} style 
     * @returns 
     */
    const initStyle = (style) => {
        const mystyle = {
            size: "15px",
            padding: "3px",
            color: "red",
            display: "none",
        };
        return !!style ? style : mystyle;
    };

    /**
     * Object style
     */
    const [style, setStyle] = useState(initStyle);

    /**
   * Updates style object. Updates fields and values passed as object
   * @param {Object} updatedFields
   */
    const updateStyle = (updatedFields) => {
        setStyle({ ...style, ...updatedFields });
    };

     /**
     * focused object 
     * */
    const [focused, setFocused] = useState(false);
    /**
     * Is in charge to set the focused state in true. 
     * It works if any user touch a field and dont type or select anything
     * @param {*} e 
     */
    const handleFocus = (e) => {
        setFocused(true);
        if(props.match.starttime == ''){
            updateStyle({display: "block"});
        }
    };
    return (
        <div className="formInput">
            <TimePicker 
            onChange={(e) => {
                props.updateMatch({starttime: e});
                updateStyle({display: "none"})
            }}
            placeholder={props.placeholder}
            onBlur = {handleFocus} focused={focused.toString()}/>
            <p></p>
            <span style={style} className="error">{props.errorMessage}</span>
        </div>
    )
}

/**
 * input select date required to choose a match date
 * @param {*} props 
 * @returns 
 */
const MatchInputDate = (props) => {
    /**
     * Object required to set the style of the <span>.
     * @param {*} style 
     * @returns 
     */
    const initStyle = (style) => {
        const mystyle = {
            size: "15px",
            padding: "3px",
            color: "red",
            display: "none",
        };
        return !!style ? style : mystyle;
    };

    /**
     * Object style
     */
    const [style, setStyle] = useState(initStyle);

    /**
   * Updates style object. Updates fields and values passed as object
   * @param {Object} updatedFields
   */
    const updateStyle = (updatedFields) => {
        setStyle({ ...style, ...updatedFields });
    };

     /**
     * focused object 
     * */
    const [focused, setFocused] = useState(false);
    /**
     * Is in charge to set the focused state in true. 
     * It works if any user touch a field and dont type or select anything
     * @param {*} e 
     */
    const handleFocus = (e) => {
        setFocused(true);
        if(props.match.startdate == ''){
            updateStyle({display: "block"});
        }
    };
    return (
        <div className="formInput">
            <DatePicker
            required
            minDate={new Date()} 
            name={props.name}
            selected={props.match.startdate}
            placeholderText={props.placeholder}
            onChange={(e) => {
                props.updateMatch({startdate: e });
                updateStyle({display: "none"})
            }}
            onBlur = {handleFocus} focused={focused.toString()}/>
            <p></p>
            <span style={style} className="error">{props.errorMessage}</span>
        </div>
    )
}

export {MatchInputText, MatchInputSelectPhase, MatchInputSelectTeamB, MatchInputSelectTeamA, MatchInputDate, MatchInputTime};
