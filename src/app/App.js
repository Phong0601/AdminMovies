import "../App.scss";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { useEffect, useState } from "react";
import Admin from "features/Admin";
import Movies from "features/Admin/Movies/Movies";
import User from "features/Admin/User/User";
import ManageMovie from "features/Admin/Movies/ManageMovie";
import AddMovie from "features/Admin/Movies/AddMovie";
import EditMovie from "features/Admin/Movies/EditMovie";
import SignIn from "features/Authentication/SignIn/SignIn";
import instance from "api/instance";
import SignUp from "features/Authentication/SignUp/SignUp";

function App() {
	const [getUser,setGetUser]= useState(null);
	const fetchUser = async()=>{
		try {
			const res = await instance.request({
				url:'/api/QuanLyNguoiDung/ThongTinTaiKhoan',
				method:'POST'
			})
			delete res.data.content.accessToken;	
			setGetUser(res.data.content)
		} catch (error) {
			
		}
	}
	useEffect(()=>{
		fetchUser()
	},[])
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/signin" element={<SignIn setGetUser={setGetUser}/>}/>
					<Route path="/" element={<Admin getUser={getUser}  />}>
						<Route path="/*users" element={<User />} />
						<Route path="/*" element={<Movies />} />
						<Route
							path="/*movies/manage"
							element={<ManageMovie />}
						/>
						<Route
							path="/*movies/edit/:id"
							element={<EditMovie />}
						/>
						<Route path="/*movies/add" element={<AddMovie />} />
						<Route path="/*signup" element={<SignUp/>}></Route>
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
