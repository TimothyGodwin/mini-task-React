import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../globalStore/slices/IdSlices";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(setToken(''));
        navigate("/login");
    }

    return (
        <nav className="bg-black-banner text-white p-3 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex-1" />
                <div className="flex items-center gap-4">
                    <span className="text-white-btn font-medium">Elon Musk</span>
                    <div className="flex items-center">
                        <div onClick={() => {
                            handleLogOut();
                        }
                        } className="w-7 h-7 cursor-pointer rounded flex items-center justify-center bg-red-500 text-white">
                            <LogoutOutlined className="text-white-btn font-medium"/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
