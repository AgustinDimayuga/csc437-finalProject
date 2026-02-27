export function Footer() {
  const navLinks = [
    "Home",
    "Browse Listings",
    "List a Home",
    "Contact",
    "Settings",
  ];

  return (
    <footer className="border-t border-black/20 mt-16">
      <div className="container-content px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">OffCampus Hub</h3>
            <p className="text-sm leading-relaxed">
              A student-focused space for finding off-campus housing and helpful
              rental resources.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link}>
                  <a href="#x">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#x">support@offcampushub.com</a>
              </li>
              <li>
                <a href="#x">Mon-Fri, 9am-5pm</a>
              </li>
              <li>
                <a href="#x">United States</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-black/20 pt-6 text-sm">
          <p>© 2026 OffCampus Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
