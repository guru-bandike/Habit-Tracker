export default class HomeController {
  static renderHome(req, res, next) {
    res.render('index', { title: 'Habit Tracker', cssFilePath: './css/home.css' });
  }
}
