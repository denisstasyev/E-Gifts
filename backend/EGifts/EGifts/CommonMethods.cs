using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace EGifts
{
    public static class CommonMethods
    {
        public static Task<string> ReadStreamAsync(Stream stream)
        {
            // Leave the body open so the next middleware can read it.
            using var reader = new StreamReader(
                stream,
                encoding: Encoding.UTF8,
                detectEncodingFromByteOrderMarks: false,
                //bufferSize: 1024,
                leaveOpen: true);
            return reader.ReadToEndAsync();
        }
    }
}