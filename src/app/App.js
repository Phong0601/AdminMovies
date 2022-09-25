import "../App.scss";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { useEffect, useState } from "react";
import Admin from "features/Admin";
import Movies from "features/Admin/Movies/Movies";
import User from "features/Admin/User/User";
import ManageMovie from "features/Admin/Movies/ManageMovie";
import AddMovie from "features/Admin/Movies/AddMovie";
import EditMovie from "features/Admin/Movies/EditMovie";

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/*" element={<Admin />}>
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
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
