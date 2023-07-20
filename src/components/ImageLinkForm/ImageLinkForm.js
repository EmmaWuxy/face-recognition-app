import './ImageLinkForm.css'

function ImageLinkForm() {
    return (
        <>
            <p>
                {'This Magic will detect faces in your picture. Enter the link of your chosen picture and hit the button, annd wait for the magic to work.'}
            </p>
            <div className="pa4 br3 shadow-5 form center">
                <input type="text" className="f4 pa2 w-70"/>
                <button className="w-30 grow f4 link ph3 pv2 white bg-light-purple center">Detect</button>
            </div>
        </>
    )
}

export default ImageLinkForm;