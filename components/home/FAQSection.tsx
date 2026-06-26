import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'What is Digital Deals Hub?',
    a: 'Digital Deals Hub is a premium digital products library where you can browse, search, and access hundreds of curated digital resources — including templates, guides, ebooks, toolkits, and more — completely free.',
  },
  {
    q: 'How do I download a product?',
    a: 'Click on any product card to open its detail page, then click the "Open Google Drive" button. You\'ll be redirected to a Google Drive folder where you can preview and download the files instantly.',
  },
  {
    q: 'What file formats are available?',
    a: 'Products come in various formats including PDF, ZIP, XLSX, Canva templates, Notion templates, and more. Each product page clearly shows the file type before you download.',
  },
  {
    q: 'What if a link is broken or unavailable?',
    a: 'Occasionally, links may become unavailable. If you encounter an issue, please contact us and we will do our best to replace the file or provide an updated version as soon as possible.',
  },
  {
    q: 'Are these products free?',
    a: 'Yes! All products in the Digital Deals Hub library are freely accessible. Simply browse, click, and download from Google Drive.',
  },
  {
    q: 'How often are new products added?',
    a: 'We regularly add new digital products to the library. Check the "Latest Collection" section on the homepage to see the most recently added resources.',
  },
]

export function FAQSection() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-700 text-primary dark:text-white mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Everything you need to know about Digital Deals Hub.</p>
      </div>
      <Accordion className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-white dark:bg-slate-900 rounded-card border border-slate-100 dark:border-slate-800 px-6"
          >
            <AccordionTrigger className="font-heading font-600 text-left text-primary dark:text-white hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
