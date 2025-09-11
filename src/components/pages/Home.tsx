import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Link, BookmarkPlus, Tags, Search, Zap } from "lucide-react";
import { ModeToggle } from "../../components/Toggle";

export const Home = () => {
  return (
    <div className="min-h-screen relative bg-background text-foreground transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Header */}
      <header className="border-b bg-card/70 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookmarkPlus className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold">LinkKeeper</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <a href="/login">Sign In</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/register">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Organize Your Links
              <br />
              Like Never Before
            </h1>
          </div>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Save, tag, and search through your favorite links with ease. Keep
            everything organized in one beautiful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px]"
              asChild
            >
              <a href="/register">Start Organizing</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px]"
              asChild
            >
              <a href="/login">Sign In</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Powerful features to help you manage and organize your links
              efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Link className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                Easy Link Saving
              </h3>
              <p className="text-card-foreground/80">
                Quickly save any link with our intuitive interface. Add titles,
                descriptions, and organize instantly.
              </p>
            </Card>

            <Card className="p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Tags className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                Smart Tagging
              </h3>
              <p className="text-card-foreground/80">
                Tag your links with custom labels and categories. Create your
                own organization system.
              </p>
            </Card>

            <Card className="p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                Powerful Search
              </h3>
              <p className="text-card-foreground/80">
                Find any link instantly with our advanced search and filtering.
                Search by tags, titles, or content.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background/80">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Get Organized?</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already organized their digital
            life with LinkKeeper.
          </p>
          <Button variant="outline" size="lg" className="min-w-[250px]" asChild>
            <a href="/register">Create Your Account</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/70 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookmarkPlus className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 text-lg font-semibold text-card-foreground">
                  LinkKeeper
                </span>
              </div>
              <p className="text-card-foreground/80 text-sm">
                The best way to organize and manage your favorite links.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-card-foreground">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-card-foreground/80">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-card-foreground">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-card-foreground/80">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-card-foreground">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-card-foreground/80">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-card-foreground/70">
            <p>&copy; 2024 LinkKeeper. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
