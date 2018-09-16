/*
	快速排序
		说明：
			 此快速排序收纳了几种快速排序方案,从最原始的Hoare提出的二分区排序方案到
			 Bentley&D. McIlroy 优化的三分区快速排序，这之中还包含了《算法第四版》书中提出的优化方案
			 如：
			 	当划分到较小的子序列时，通常可以使用插入排序替代快速排序；
			 	三平均分区法，采取中位数思想；
			 在同级目录下有测试代码，可以在自己的机器上尝试！
			 通过学习《算法第四版》结合网上极客给出的实现，整理出了此排序方案！
		
		优化：尽管这样还有优化方案。欢迎优化

		参考：http://www.cnblogs.com/yangecnu/p/Introduce-Quick-Sort.html
			 《算法第四版》
		
		修改：
			  1) 整理：王仕柱
			  	 时间：2016/07/19
			  	 内容：第一版
			  2) 整理：
			  	 时间：
			  	 内容：
*/

var exp = module.exports

/// <summary>
/// 调用入口
/// </summary>
/// <param name="array">待排序数组</param>
/// <param name="algorithm">使用的排序函数名</param>
/// <param name="rule">排序准则 (0 or null:升序，1:降序)</param>
/// <param name="field">排序列</param>
exp.QuickSort = function(array,algorithm,rule,field)
{
	//一种改进方案: 
	//当划分到较小的子序列时，通常可以使用插入排序替代快速排序,具体数值因机器不同而不同
	this.M = 10

	this.array = array
	this.len = this.array.length
	this.field = field

	if (this.len <= 1)
	{
		return
	}

	// 随机打乱数组，不可删掉
	this.shuffle()

	// 降序
	if (rule === 1)
	{
		/*---------重写比较函数-----------*/
		if (field)
		{
			this.equal = function(a,b)
			{
				return a[this.field] === b[this.field]
			}
			this.less = function(a,b)
			{
				if (typeof(a)== "undefined")
				{
					return false
				}
				if (typeof(b)== "undefined")
				{
					return true
				}
				return b[this.field] < a[this.field]
			}
			this.greater = function(a,b)
			{
				if (typeof(a)== "undefined")
				{
					return true
				}
				if (typeof(b)== "undefined")
				{
					return false
				}
				return b[this.field] > a[this.field]
			}
			this.compare = function(a,b)
			{
				if (a[this.field] === b[this.field]) return 0;
  				return a[this.field] < b[this.field] ? 1 : -1;
			}
		}
		else
		{
			this.equal = function(a,b)
			{
				return a === b			
			}
			this.less = function(a,b)
			{
				return b < a
			}
			this.greater = function(a,b)
			{
				return b > a
			}
			this.compare = function(a,b)
			{
				if (a === b) return 0;
  				return a < b ? 1 : -1;
			}
		}
	}
	else
	{
		if (field)
		{	
			/*---------重写比较函数-----------*/

			this.equal = function(a,b)
			{
				return a[this.field] === b[this.field]
			}
			this.less = function(a,b)
			{
				if (typeof(a)== "undefined")
				{
					return true
				}
				if (typeof(b)== "undefined")
				{
					return false
				}
				return a[this.field] < b[this.field]
			}
			this.greater = function(a,b)
			{
				if (typeof(a)== "undefined")
				{
					return false
				}
				if (typeof(b)== "undefined")
				{
					return true
				}
				return a[this.field] > b[this.field]
			}
			this.compare = function(a,b)
			{
				if (a[this.field] === b[this.field]) return 0;
  				return a[this.field] < b[this.field] ? -1 : 1;
			}
		}
	}
	
	this[algorithm](0,this.len - 1)
}

exp.equal = function(a,b)
{
	return a === b
}

exp.less = function(a,b)
{
	return a < b
}

exp.greater = function(a,b)
{
	return a > b
}

exp.compare = function (a, b) 
{
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

exp.exchange = function(x,y)
{
	if(x < 0 || y < 0 || this.len <= x || this.len <= y) 
	{
		throw new Error('IndexError ' + this.array + " - " + b);
	}
	var tmp = this.array[x]
	this.array[x] = this.array[y]
	this.array[y] = tmp
}

/// <summary>
/// 随机打乱数组元素，同时也是一种优化方案
/// </summary>
exp.shuffle = function() {
    var m = this.len
    var t
    var i
    while (m) 
    {
        i = Math.floor(Math.random() * m--)
        t = this.array[m]
        this.array[m] = this.array[i]
        this.array[i] = t
    }
}

/// <summary>
/// 快速排序中的划分过程
/// </summary>
/// <param name="lo">最左侧位置</param>
/// <param name="hi">最右侧位置</param>
/// <returns>中间元素位置</returns>
exp.partition = function(lo, hi)
{
	var i = lo, j = hi + 1;
    while (true)
    {
        while (this.less(this.array[++i],this.array[lo]))
        {
            if (i == hi) break;
        }
        while (this.greater(this.array[--j],this.array[lo]))
        {
            if (j == lo) break;
        }

        if (i >= j) break;

        this.exchange(i, j);
    }
    this.exchange(lo, j);
    return j;
}

/// <summary>
/// 查找三个元素中位于中间的那个元素
/// </summary>
/// <param name="lo"></param>
/// <param name="center"></param>
/// <param name="hi"></param>
exp.medianOf3 = function(lo, center, hi)
{
	return (this.less(this.array[lo], this.array[center]) ?
       (this.less(this.array[center], this.array[hi]) ? center : this.less(this.array[lo], this.array[hi]) ? hi : lo) :
       (this.less(this.array[hi], this.array[center]) ? center : this.less(this.array[hi], this.array[lo]) ? hi : lo));
}

/// <summary>
/// 传统插入排序
/// </summary>
/// <param name="lo">最左侧位置</param>
/// <param name="hi">最右侧位置</param>
exp.insertionSort = function (lo,hi) 
{
	if (lo >= hi)
	{
		return
	}

	var start = lo + 1
	var end = hi + 1

  	for (var i = start; i < end; i++) 
  	{
    	var aux = this.array[i]
    	var j = i

    	while ((j > start - 1) && this.less(aux , this.array[j - 1]))
    	{
      		this.array[j] = this.array[j - 1];
      		j--;
    	}

    	this.array[j] = aux;
  	}
}
/// <summary>

/// Dijkstra  三分区(3-way partitioning) 快速排序
///
/// 从左至右扫描数组，维护一个指针lt使得[lo…lt-1]中的元素都比v小，
/// 一个指针gt使得所有[gt+1….hi]的元素都大于v，以及一个指针i，使得所有[lt…i-1]的元素都和v相等。
/// 元素[i…gt]之间是还没有处理到的元素，i从lo开始，从左至右开始扫描：
/// · 如果a[i]<v: 交换a[lt]和a[i],lt和i自增
/// · 如果a[i]>v:交换a[i]和a[gt], gt自减
/// · 如果a[i]=v: i自增
///
/// </summary>
/// <param name="lo">最左侧位置</param>
/// <param name="hi">最右侧位置</param>
exp.quick3wayByDijkstra = function(lo,hi)
{
	if (hi <= lo)
	{	
		return
	}
	var lt = lo,i = lo + 1,gt = hi
	var v = this.array[lo]
	while(i <= gt)
	{
		if(this.less(this.array[i],v))
		{
			this.exchange(lt++,i++)
		}
		else if(this.greater(this.array[i],v))
		{
			this.exchange(i,gt--)
		}
		else
		{
			i++
		}
	}
	this.quick3wayByDijkstra(lo,lt - 1)
	this.quick3wayByDijkstra(gt + 1,hi)
}

/// <summary>
///
/// Dijkstra  三分区(3-way partitioning) 快速排序结合插入排序优化方案
///
/// 从左至右扫描数组，维护一个指针lt使得[lo…lt-1]中的元素都比v小，
/// 一个指针gt使得所有[gt+1….hi]的元素都大于v，以及一个指针i，使得所有[lt…i-1]的元素都和v相等。
/// 元素[i…gt]之间是还没有处理到的元素，i从lo开始，从左至右开始扫描：
/// · 如果a[i]<v: 交换a[lt]和a[i],lt和i自增
/// · 如果a[i]>v:交换a[i]和a[gt], gt自减
/// · 如果a[i]=v: i自增
///
/// </summary>
/// <param name="lo">最左侧位置</param>
/// <param name="hi">最右侧位置</param>
exp.quick3wayInsertSortByDijkstra = function(lo,hi)
{
	if (hi <= lo)
	{
		return
	}
	if (hi <= lo + this.M)
	{
		this.insertionSort(lo,hi)
		return
	}
	var lt = lo,i = lo + 1,gt = hi
	var v = this.array[lo]
	while(i <= gt)
	{
		if(this.less(this.array[i], v))
		{
			this.exchange(lt++,i++)
		}
		else if(this.greater(this.array[i], v))
		{
			this.exchange(i,gt--)
		}
		else
		{
			i++
		}
	}
	this.quick3wayInsertSortByDijkstra(lo,lt - 1)
	this.quick3wayInsertSortByDijkstra(gt + 1,hi)
}

/// <summary>
/// 最原始的Hoare  二分区(2-way partitioning) 快速排序
/// </summary>
/// <param name="lo">最左侧位置</param>
/// <param name="hi">最右侧位置</param>
exp.quick2wayByHoare = function(lo, hi)
{
    if (lo >= hi) return;
    var index = this.partition(lo, hi);
    this.quick2wayByHoare(lo, index - 1);
    this.quick2wayByHoare(index + 1, hi);
}

/// <summary>
/// Bentley&D. McIlroy 三分区快速排序结合插入排序优化方案(测试分析后是最好的方案)
///
/// Dijkstra的三分区快速排序虽然在快速排序发现不久后就提出来了，但是对于序列中重复值不多的情况下，
/// 它比传统的2分区快速排序需要更多的交换次数。
/// Bentley 和D. McIlroy在普通的三分区快速排序的基础上，对一般的快速排序进行了改进。在划分过程中，
/// i遇到的与v相等的元素交换到最左边，j遇到的与v相等的元素交换到最右边，
/// i与j相遇后再把数组两端与v相等的元素交换到中间
/// 这个方法不能完全满足只扫描一次的要求，但它有两个好处：首先，如果数据中没有重复的值，
/// 那么该方法几乎没有额外的开销；其次，如果有重复值，那么这些重复的值不会参与下一趟排序，
/// 减少了无用的划分。
/// 
/// </summary>
/// <param name="lo">最左侧位置</param>
/// <param name="hi">最右侧位置</param>
exp.quick3wayInsertSortByBentleyMcIlroy = function(lo,hi)
{
	if (hi <= lo)
	{
		return
	}
	if (hi <= lo + this.M)
	{
		this.insertionSort(lo,hi)
		return
	}
	var i = lo
	var j = hi + 1
	var p = lo
	var q = hi + 1
	var v = this.array[lo]
	while(true)
	{
		while(this.less(this.array[++i], v))
		{
			if(i == hi)
			{ 
				break
			}
		}
		while(this.greater(this.array[--j], v))
		{
			if(j == lo)
			{
				break
			}
		}

		if (i == j && this.equal(this.array[i], v))
		{
			this.exchange(++p,i)
		}

		if(i >= j)
		{
			break
		}

		this.exchange(i,j)

		if (this.equal(this.array[i],v))
		{
			this.exchange(++p,i)
		}

		if (this.equal(this.array[j], v))
		{
			this.exchange(--q,j)
		}
		
	}
	i = j + 1
	for(var k = lo;k <= p; k++)
	{
		this.exchange(k,j--)
	}
	for(var k = hi;k >= q; k--)
	{
		this.exchange(k,i++)
	}
	this.quick3wayInsertSortByBentleyMcIlroy(lo,j)
	this.quick3wayInsertSortByBentleyMcIlroy(i,hi)
}

/// <summary>
/// Bentley&D. McIlroy 三分区快速排序
///
/// Dijkstra的三分区快速排序虽然在快速排序发现不久后就提出来了，但是对于序列中重复值不多的情况下，
/// 它比传统的2分区快速排序需要更多的交换次数。
/// Bentley 和D. McIlroy在普通的三分区快速排序的基础上，对一般的快速排序进行了改进。在划分过程中，
/// i遇到的与v相等的元素交换到最左边，j遇到的与v相等的元素交换到最右边，
/// i与j相遇后再把数组两端与v相等的元素交换到中间
/// 这个方法不能完全满足只扫描一次的要求，但它有两个好处：首先，如果数据中没有重复的值，
/// 那么该方法几乎没有额外的开销；其次，如果有重复值，那么这些重复的值不会参与下一趟排序，
/// 减少了无用的划分。
///
/// </summary>
/// <param name="lo">最左侧位置</param>
/// <param name="hi">最右侧位置</param>
exp.quick3wayByBentleyMcIlroy = function(lo,hi)
{
	if (hi <= lo)
	{
		return
	}
	var i = lo
	var j = hi + 1
	var p = lo
	var q = hi + 1
	var v = this.array[lo]
	while(true)
	{
		while(this.less(this.array[++i], v))
		{
			if(i == hi)
			{ 
				break
			}
		}
		while(this.greater(this.array[--j], v))
		{
			if(j == lo)
			{
				break
			}
		}

		if (i == j && this.equal(this.array[i], v))
		{
			this.exchange(++p,i)
		}

		if(i >= j)
		{
			break
		}

		this.exchange(i,j)

		if (this.equal(this.array[i],v))
		{
			this.exchange(++p,i)
		}

		if (this.equal(this.array[j], v))
		{
			this.exchange(--q,j)
		}
		
	}
	i = j + 1
	for(var k = lo;k <= p; k++)
	{
		this.exchange(k,j--)
	}
	for(var k = hi;k >= q; k--)
	{
		this.exchange(k,i++)
	}
	this.quick3wayByBentleyMcIlroy(lo,j)
	this.quick3wayByBentleyMcIlroy(i,hi)
}

/// <summary>

/// 三平均分区法(Median of three partitioning) 快速排序
/// 在一般的的快速排序中，选择的是第一个元素作为中轴(pivot),这会出现某些分区严重不均的极端情况，
/// 比如划分为了1和n-1两个序列，从而导致出现最坏的情况。三平均分区法与一般的快速排序方法不同，
/// 它并不是选择待排数组的第一个数作为中轴，而是选用待排数组最左边、最右边和最中间的三个元素的中间值作为中轴。
/// 这一改进对于原来的快速排序算法来说，主要有两点优势：

///（1） 首先，它使得最坏情况发生的几率减小了。

/// （2） 其次，未改进的快速排序算法为了防止比较时数组越界，在最后要设置一个哨点。如果在分区排序时，
/// 中间的这个元素（也即中轴）是与最右边数过来第二个元素进行交换的话，那么就可以省略与这一哨点值的比较。

/// 对于三平均分区法还可以进一步扩展，在选取中轴值时，
/// 可以从由左中右三个中选取扩大到五个元素中或者更多元素中选取，
/// 一般的，会有（2t＋1）平均分区法（median-of-(2t+1)。常用的一个改进是，当序列元素小于某个阈值N时，
/// 采用三平均分区，当大于时采用5平均分区。

/// </summary>
/// <param name="lo">最左侧位置</param>
/// <param name="hi">最右侧位置</param>
exp.quick3wayInsertSortWithMedian = function(lo, hi)
{
	if (hi <= lo)
	{
		return
	}
    if (hi <= lo + this.M)
	{	
        this.insertionSort(lo, hi);
        return;
    }
    var m = this.medianOf3(lo, lo + (hi - lo) / 2, hi);
    this.exchange(lo, m);
    var index = this.partition(lo, hi);
    this.quick3wayInsertSortWithMedian(lo, index - 1);
    this.quick3wayInsertSortWithMedian(index + 1, hi);
}

/// <summary>
/// js 原生排序
/// </summary>
exp.defaultSort = function()
{
	this.array.sort((function(p){return function(a,b){return p.compare(a,b)}})(this))
}
