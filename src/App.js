import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";

export default function App() {
	const orderOptions = [
		{ label: "Choose...", value: "" },
		{ label: "Delivery", value: "delivery" },
		{ label: "Take out", value: "takeout" },
		{ label: "Eat in", value: "eatin" }
	];

	const dietOptions = [
		{ label: "Vegan", value: "vegan" },
		{ label: "Vegetarian", value: "vegetarian" },
		{ label: "Carnitarian", value: "carnitarian" }
	];

	const [orderObj, setOrderObj] = useState({
		method: "",
		size: "",
		diet: [],
		comments: ""
	});

	const [diet, setDiet] = useState([]);

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		let newArr;
		switch (type) {
			case "select-one":
				setOrderObj({ ...orderObj, [name]: value });
				break;
			case "radio":
				setOrderObj({ ...orderObj, [name]: value });
				break;
			case "checkbox":
				if (!diet.includes(value)) {
					newArr = [...diet, value];
					setDiet(newArr);
				} else {
					newArr = diet.filter((val) => val !== value);
					setDiet(newArr);
				}
				setOrderObj({ ...orderObj, diet: newArr });
				break;
			default:
				break;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submit: ", diet);
		console.log(orderObj);
	};

	return (
		<div className="App">
			<h1>Order your pizza here:</h1>
			<form className="pizza-form" onSubmit={handleSubmit}>
				<h2>Order</h2>
				<div>
					<select name="method" onChange={handleChange}>
						{orderOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				<h2>Size</h2>
				<div className="size">
					<label key="small">
						<input
							type="radio"
							value="small"
							name="size"
							onChange={handleChange}
							checked={orderObj.size === "small"}
						/>
						Small
					</label>
					<label key="medium">
						<input
							type="radio"
							value="medium"
							name="size"
							onChange={handleChange}
							checked={orderObj.size === "medium"}
						/>
						Medium
					</label>
					<label key="large">
						<input
							type="radio"
							value="large"
							name="size"
							onChange={handleChange}
							checked={orderObj.size === "large"}
						/>
						Large
					</label>
				</div>

				<div className="diet">
					{dietOptions.map((option) => (
						<label key={option.value}>
							<input
								key={option.value}
								type="checkbox"
								name={option.value}
								value={option.value}
								onChange={handleChange}
								checked={orderObj.diet.includes(option.value)}
							/>
							{option.label}
						</label>
					))}
				</div>
				<div className="comments">
					<label>
						Comments
						<input type="area" name="comments" onChange={handleChange} />
					</label>
				</div>
				<button>Submit</button>
			</form>
		</div>
	);
}
