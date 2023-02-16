const fs = require('fs');

// Exports the data so it can be Required in other files
module.exports = {
    // executes when the command is called
	addUser(user) {
		const moneyJSON = JSON.parse(fs.readFileSync("data/money.json"));
		for (let i = 0; i < moneyJSON.length; i++) {
			console.log(moneyJSON[i]["user"]);
			if (moneyJSON[i]["user"] === user)
			{
				console.log("User exists");
				return i;
			}
		}
        moneyJSON.push({user: interaction.user.tag, money: 50});
		console.log("test");
		fs.writeFileSync("data/money.json", JSON.stringify(moneyJSON));
        return moneyJSON.length - 1;
    }
}