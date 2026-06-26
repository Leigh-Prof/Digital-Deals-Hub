import { Info } from 'lucide-react'

export function DisclaimerBox() {
  return (
    <div className="flex gap-4 p-5 rounded-card bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
      <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
      <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
        The files provided are carefully curated digital resources collected from various publicly available sources and educational references. While we strive to ensure every file is accessible and functional, there may be rare occasions where certain links or files become unavailable over time. If you encounter any issues accessing a file, we sincerely appreciate your understanding. Please contact us and we will do our best to replace the unavailable file or provide an updated version whenever possible. Our goal is to continuously improve this library and deliver even more valuable digital resources for our community. Thank you for your support.
      </p>
    </div>
  )
}
