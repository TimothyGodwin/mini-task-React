import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../globalStore/slices/IdSlices";
import { Switch } from "antd";
import { useEffect, useState } from "react";
import { getData } from "../../pages/dashboard/helper";

const Header = () => {
    const themeSave = JSON.parse(sessionStorage.getItem('themeSave'));
    const userTrack = getData()
    const [checked, setChecked] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(setToken(''));
        const trackActivity = [...userTrack,
        { id: Date.now(), action: `User Logged Out` }];
        sessionStorage.setItem('trackActivity', JSON.stringify(trackActivity));
        navigate("/login");
    }

    useEffect(() => {
        themeSave === 'dark' ? setChecked(false) : setChecked(true)
        document.body.setAttribute('data-theme', themeSave);
    }, [])

    const onChange = (checked) => {
        const themeSelected = checked ? 'light' : 'dark'
        const trackActivity = [...userTrack,
        { id: Date.now(), action: `Changed theme to ${checked ? 'light' : 'dark'}` }];
        sessionStorage.setItem('trackActivity', JSON.stringify(trackActivity));
        setChecked(checked)
        document.body.setAttribute('data-theme', themeSelected);
        sessionStorage.setItem('themeSave', JSON.stringify(themeSelected));
    };

    return (
        <nav className="header-banner text-white p-3 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex-1" />
                <div className="flex items-center gap-4">
                    <div><Switch defaultChecked checked={checked} onChange={onChange} /></div>
                    <span className="text-white-btn font-medium">Elon Musk</span>
                    <div className="flex items-center">
                        <div onClick={() => {
                            handleLogOut();
                        }
                        } className="w-7 h-7 cursor-pointer rounded flex items-center justify-center bg-red-500 text-white">
                            <LogoutOutlined className="text-white-btn font-medium" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
