import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, FileText, PenLine } from "lucide-react"
import Link from "next/link"

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Contribute to itunda.tech</h1>
          <p className="text-xl text-muted-foreground">
            Share your knowledge and insights with the developer and designer community.
          </p>
        </div>

        <Tabs defaultValue="guidelines" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
            <TabsTrigger value="submit">Submit Article</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="guidelines" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contribution Guidelines</CardTitle>
                <CardDescription>Please review these guidelines before submitting your article.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Content Types</h3>
                  <p className="text-muted-foreground">We accept the following types of content:</p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Technical tutorials and guides</li>
                    <li>Case studies and project retrospectives</li>
                    <li>Design process insights</li>
                    <li>Best practices and methodologies</li>
                    <li>Tool comparisons and reviews</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Quality Standards</h3>
                  <p className="text-muted-foreground">All submissions should meet the following standards:</p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Original content not published elsewhere</li>
                    <li>Clear, concise, and well-structured writing</li>
                    <li>Accurate technical information</li>
                    <li>Proper attribution for any external resources</li>
                    <li>High-quality images and diagrams (if applicable)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Formatting</h3>
                  <p className="text-muted-foreground">
                    We use Markdown for article formatting. Please follow these guidelines:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Use headings (H2, H3) to organize your content</li>
                    <li>Include code snippets with proper syntax highlighting</li>
                    <li>Keep paragraphs concise and focused</li>
                    <li>Use bullet points and numbered lists where appropriate</li>
                    <li>Include a brief author bio and profile picture</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Review Process</h3>
                  <p className="text-muted-foreground">
                    Our editorial team will review your submission and may suggest edits or improvements. The review
                    process typically takes 1-2 weeks.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="#submit">Ready to Submit</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="submit" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Article</CardTitle>
                <CardDescription>Fill out the form below to submit your article for review.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Article Title</Label>
                    <Input id="title" placeholder="Enter a descriptive title" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="excerpt">Brief Excerpt (150-200 characters)</Label>
                    <Textarea id="excerpt" placeholder="Write a compelling summary of your article" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a category</option>
                      <option value="dev">Developer Insight</option>
                      <option value="design">Designer Perspective</option>
                      <option value="case-study">Case Study</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="content">Article Content (Markdown supported)</Label>
                    <Textarea id="content" placeholder="Write your article here..." className="min-h-[300px]" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="e.g., React, Design Systems, UX Research" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="author-name">Your Name</Label>
                    <Input id="author-name" placeholder="How you want to be credited" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="author-bio">Short Bio</Label>
                    <Textarea id="author-bio" placeholder="Tell us a bit about yourself (100-150 characters)" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="author-email">Email Address</Label>
                    <Input id="author-email" type="email" placeholder="For communication about your submission" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Submit for Review</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about contributing to itunda.tech</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Do I retain copyright of my article?</h3>
                  <p className="text-muted-foreground">
                    Yes, you retain the copyright to your content. By submitting, you grant us a non-exclusive license
                    to publish and distribute your article on itunda.tech.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Can I republish my article elsewhere?</h3>
                  <p className="text-muted-foreground">
                    After your article has been published on itunda.tech for 2 weeks, you may republish it elsewhere
                    with attribution and a canonical link back to the original.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Do you pay for articles?</h3>
                  <p className="text-muted-foreground">
                    Currently, we do not offer payment for contributions. Authors benefit from exposure to our growing
                    community and establishing their expertise in the field.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">How long should my article be?</h3>
                  <p className="text-muted-foreground">
                    We recommend articles between 1,500-3,000 words. However, quality is more important than length.
                    Focus on providing valuable insights rather than meeting a specific word count.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Can I include links to my own projects or products?</h3>
                  <p className="text-muted-foreground">
                    Relevant links are acceptable if they add value to the article. However, articles that are primarily
                    promotional will not be accepted. All external links are reviewed by our editorial team.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">How do I check the status of my submission?</h3>
                  <p className="text-muted-foreground">
                    After submitting, you'll receive a confirmation email with a tracking link. You can use this to
                    check the status of your submission at any time.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href="/contact">More Questions? Contact Us</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold">The Contribution Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <PenLine className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Write</CardTitle>
                <CardDescription>Create your article following our guidelines</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Submit</CardTitle>
                <CardDescription>Submit your article for editorial review</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Publish</CardTitle>
                <CardDescription>Once approved, your article goes live</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
