using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EGifts.DataBase.DatabaseClasses
{
    public class Role : DataBaseClass
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public Permissions Permissions { get; set; }
    }

    [Flags]
    public enum Permissions
    {
        AdminAccess,
    }
}
