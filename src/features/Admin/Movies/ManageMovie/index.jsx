import React, { Fragment, useState } from "react";
import { Button, Table } from "antd";
import { AudioOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieListAction } from "features/Admin/utils/adminAction";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const { Search } = Input;

function ManageMovie() {
	const dispatch = useDispatch();

	const fetchMovieList = () => {
		dispatch(fetchMovieListAction());
	};

	const movieList = useSelector((state) => state.admin.movieList);

	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		fetchMovieList();
	}, []);

	const columns = [
		{
			title: "Mã phim",
			dataIndex: "maPhim",
			key: "maPhim",
			width: "10%",
			sorter: (a, b) => a.maPhim - b.maPhim,
			sortDirections: ["descend", "ascend"],
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
						<NavLink style={{ marginRight: 20 }} to="/">
							<EditOutlined
								style={{ fontSize: 25 }}
								title="Chỉnh sửa"
							/>
						</NavLink>
						<NavLink to="/">
							<DeleteOutlined
								style={{ fontSize: 25, color: "red" }}
								title="Xóa"
							/>
						</NavLink>
					</Fragment>
				);
			},
		},
	];

	const data = movieList;

	return (
		<div className="EditMovie">
			<h3 className="title">Danh sách phim</h3>

			<Search
				placeholder="Tìm kiếm..."
				allowClear
				// onSearch={(value) => {
				// 	setSearchText(value);
				// }}
				onChange={(e) => setSearchText(e.target.value.toString())}
				style={{
					width: 200,
				}}
			/>
			<Table columns={columns} dataSource={data} rowKey="maPhim" />
		</div>
	);
}

export default ManageMovie;
