
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ブランド情報 */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-[20px] font-bold text-black mb-4">SHIFT</div>
            <p className="text-[#111111] mb-4 max-w-md text-[14px] font-semibold leading-[20px]">
              ビジネス、テクノロジー、マネー、ライフスタイルの最新情報をお届けする総合メディアです。
            </p>
            <div className="mb-4">
              <p className="text-[#666666] text-[12px]">
                運営：msmedia32's projects<br />
                お問い合わせ：shift@money-shift.jp
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-[#222222] hover:text-[#027EBE]">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#222222] hover:text-[#027EBE]">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#222222] hover:text-[#027EBE]">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="/newsletter" className="text-[#222222] hover:text-[#027EBE]">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* カテゴリ */}
          <div>
            <h3 className="font-bold text-black mb-4 text-[18px]">カテゴリ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/business" className="text-[#222222] hover:text-[#027EBE] text-[14px] font-semibold">
                  ビジネス
                </Link>
              </li>
              <li>
                <Link href="/technology" className="text-[#222222] hover:text-[#027EBE] text-[14px] font-semibold">
                  テクノロジー
                </Link>
              </li>
              <li>
                <Link href="/money" className="text-[#222222] hover:text-[#027EBE] text-[14px] font-semibold">
                  マネー
                </Link>
              </li>
              <li>
                <Link href="/life" className="text-[#222222] hover:text-[#027EBE] text-[14px] font-semibold">
                  ライフ
                </Link>
              </li>
            </ul>
          </div>

          {/* ツール・サービス */}
          <div>
            <h3 className="font-bold text-black mb-4 text-[18px]">ツール・サービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/money/simulators" className="text-[#222222] hover:text-[#027EBE] text-[14px] font-semibold">
                  投資シミュレーター
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-[#222222] hover:text-[#027EBE] text-[14px] font-semibold">
                  メルマガ登録
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-[#222222]">
          <p className="text-[14px] font-semibold">
            © 2025 SHIFT (msmedia32's projects). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
