import React from "react"

function FormComponent({handleDone, handleSave, cards, handleChange}) {

        return (
            <form>
                <div className= "form-group">
                    <label className="form-label" htmlFor="name">Front</label>
                        <textarea
                        type="text"
                        className="form-control"
                        id="front"
                        placeholder="Front side of card"
                        required
                        name="front"
                        onChange={handleChange}
                        value={cards.front}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">Back</label>
                        <textarea
                        type="text"
                        className="form-control input-lg"
                        id="back"
                        placeholder="Back side of card"
                        required
                        name="back"
                        onChange={handleChange}
                        value={cards.back}/>
                </div>
                <button type="submit" className="btn btn-secondary" onClick={handleDone}>Done</button>
                <button type="submit" className="btn btn-primary" onClick={handleSave}>Save</button>
            </form>
        )
}

export default FormComponent
            