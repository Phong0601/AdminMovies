import React, { Fragment, useState } from "react";
import { Button, Table } from "antd";
import {
	AudioOutlined,
	CalendarOutlined,
	DeleteOutlined,
	EditOutlined,
} from "@ant-design/icons";
import { Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchMovieListAction,
	removeMovieAction,
} from "features/Admin/utils/adminAction";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";

const { Search } = Input;

function ManageMovie() {
	const dispatch = useDispatch();

	const history = useHistory();

	const fetchMovieList = () => {
		dispatch(fetchMovieListAction());
	};

	const movieList = useSelector((state) => state.admin.movieList);

	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		fetchMovieList();
	}, [movieList]);

	const removeMovie = (film) => {
		if (window.confirm("Bạn có muốn xóa phim " + film.tenPhim)) {
			dispatch(removeMovieAction(film.maPhim));
		}
	};

	const columns = [
		{
			title: "Mã phim",
			dataIndex: "maPhim",
			key: "maPhim",
			width: "10%",
			sorter: (a, b) => a.maPhim - b.maPhim,
			sortDirections: ["descend"],
		},
		{
			title: "Hình ảnh",
			dataIndex: "hinhAnh",
			key: "hinhAnh",
			width: "15%",
			render: (text, film, index) => {
				return (
					<Fragment>
						<img
							key={film.maPhim}
							src={film.hinhAnh}
							width={50}
							alt=""
							onError={(e) => (
								(e.target.onerror = null),
								(e.target.src = `https://picsum.photos/id/${index}/50/70`)
							)}
						/>
					</Fragment>
				);
			},
		},
		{
			title: "Tên phim",
			dataIndex: "tenPhim",
			key: "tenPhim",
			width: "20%",
			sorter: (a, b) => {
				let tenPhimA = a.tenPhim.toLowerCase().trim();
				let tenPhimB = b.tenPhim.toLowerCase().trim();
				if (tenPhimA > tenPhimB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend"],
			filteredValue: [searchText],
			onFilter: (value, record) => {
				return (
					String(record.tenPhim)
						.toLowerCase()
						.includes(value.toLowerCase()) ||
					String(record.maPhim)
						.toLowerCase()
						.includes(value.toLowerCase())
				);
			},
		},
		{
			title: "Mô tả",
			dataIndex: "moTa",
			key: "moTa",
			width: "40%",
			render: (text, film) => {
				return (
					<Fragment>
						{film.moTa.length > 50
							? film.moTa.substr(0, 50) + " ..."
							: film.moTa}
					</Fragment>
				);
			},
		},
		{
			title: "Hành động",
			dataIndex: "hanhDong",
			key: "hanhDong",
			width: "15%",
			render: (text, film) => {
				return (
					<Fragment>
						<NavLink
							style={{ marginRight: 20 }}
							to={"/movies/edit/" + film.maPhim}
						>
							<EditOutlined
								style={{ fontSize: 25 }}
								title="Chỉnh sửa"
							/>
						</NavLink>
						<span
							style={{ cursor: "pointer" }}
							onClick={() => removeMovie(film)}
						>
							<DeleteOutlined
								style={{ fontSize: 25, color: "red" }}
								title="Xóa"
							/>
						</span>
						<NavLink
							style={{ marginLeft: 20 }}
							to={"/movies/showtime/" + film.maPhim}
						>
							<CalendarOutlined
								style={{ fontSize: 25 }}
								title="Thêm lịch chiếu"
							/>
						</NavLink>
					</Fragment>
				);
			},
		},
	];
	// data for table
	const data = movieList;

	return (
		<div className="EditMovie">
			<h1 className="title" style={{ fontSize: 20 }}>
				Danh sách phim
			</h1>

			<Search
				placeholder="Tìm kiếm..."
				allowClear
				// onSearch={(value) => {
				// 	setSearchText(value);
				// }}
				onChange={(e) => setSearchText(e.target.value.toString())}
				style={{
					width: 400,
					marginBottom: 20,
				}}
			/>
			<Table columns={columns} dataSource={data} rowKey="maPhim" />
		</div>
	);
}

export default ManageMovie;
