import "./Sidebar.css";
function Sidebar() {
    return (
       <section className="sidebar">
        {/*new chat button*/}
        <button>
            <img src="src/assetes/blacklogo.png" alt="icon" className="logo" />
            <span><i class="fa-regular fa-pen-to-square"></i></span>
        </button>

        {/*history*/}
        <ul className="history">
            <li>thread1</li>
            <li>thread2</li>
            <li>thread3</li>
        </ul>
        {/*ssection*/}

        <div className="sign">
            <p>By dnyanu &hearts;</p>
        </div>
       </section>
    )
}
export default Sidebar;
